
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Stripe;
using Stripe_Payments_Web_Api.Contracts;
using Stripe_Payments_Web_Api.Models.Stripe;
using Stripe.Checkout;
using API.Models;
using System.Security.Claims;
using Microsoft.Extensions.Options;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentsController : ControllerBase
{
        private readonly UserManager<AppUser> _userManager;
        private readonly IOptions<StripeSettings> _stripeSettings;
    public PaymentsController(IOptions<StripeSettings> stripeSettings, UserManager<AppUser> userManager)
    {
            _stripeSettings = stripeSettings;
            _userManager = userManager;

        StripeConfiguration.ApiKey = "sk_test_51N1AX9GrXwZ3ORKWnC0IEHkAj2NT9jneEc96VZVN9PAAIWUdde45X5l8BTBqXQDTH64L2SYiMLsGw6JYsJwB3BK400zcg8Q7Xe";

		//Configuration = configuration;
		//StripeConfiguration.ApiKey = Configuration.GetValue<string>("StripeSettings:SecretKey");
    }
    
    [HttpPost("create-checkout-session")]
		public async Task<IActionResult> CreateCheckoutSession([FromBody] CreateCheckoutSessionRequest req)
		{
			var options = new SessionCreateOptions
			{
				SuccessUrl = "https://localhost:4200/success",
				CancelUrl = "https://localhost:4200/get-premium",
				PaymentMethodTypes = new List<string>
				{
					"card",
				},
				Mode = "payment",
				LineItems = new List<SessionLineItemOptions>
				{
					new SessionLineItemOptions
					{
						Price = req.PriceId,
						Quantity = 1,
					},
				},
			};

			var service = new SessionService();
			service.Create(options);
			try
			{
				var session = await service.CreateAsync(options);
				return Ok(new CreateCheckoutSessionResponse
				{
					SessionId = session.Id,
				});
			}
			catch (StripeException e)
			{
				Console.WriteLine(e.StripeError.Message);
				return BadRequest(new ErrorResponse
				{
					ErrorMessage = new ErrorMessage
					{
						Message = e.StripeError.Message,
					}
				});
			}
		}


		 [HttpPost("payment/add/role")]
        	public async Task<ActionResult> SetRole([FromBody] GetUsername getUsername)
        {
           
            var user = await _userManager.Users
            .SingleOrDefaultAsync(x => x.UserName == getUsername.Username.ToLower());

             if (user == null) return Unauthorized("invalid username");
            var newRole = await _userManager.AddToRoleAsync(user, "PremiumMember");

            if (!newRole.Succeeded) return BadRequest("Bad request");

            return Ok(newRole);
        }


		[Authorize]
		[HttpPost("customer-portal")]
		public async Task<IActionResult> CustomerPortal([FromBody] CustomerPortalRequest req)
		{


			ClaimsPrincipal principal = HttpContext.User as ClaimsPrincipal;
			var claim = principal.Claims.FirstOrDefault(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier");

			var userFromDb = await _userManager.FindByNameAsync(claim.Value);

			if (userFromDb == null)
			{
				return BadRequest("no user found");
			}

			try

			

			{
				var options = new Stripe.BillingPortal.SessionCreateOptions
				{
					//Customer = "cus_NtkqNpEUuMj9DT",
					Customer = userFromDb.CustomerId,
					ReturnUrl = req.ReturnUrl,
				};
				var service = new Stripe.BillingPortal.SessionService();
				var session = await service.CreateAsync(options);

				return Ok(new
				{
					url = session.Url
				});
			}
			catch (StripeException e)
			{
				Console.WriteLine(e.StripeError.Message);
				return BadRequest(new ErrorResponse
				{
					ErrorMessage = new ErrorMessage
					{
						Message = e.StripeError.Message,
					}
				});
			}

		}

}
} 

