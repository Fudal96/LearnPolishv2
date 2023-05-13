using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Stripe_Payments_Web_Api.Contracts;
using Stripe_Payments_Web_Api.Models.Stripe;

namespace Stripe_Payments_Web_Api.Controllers
{
    [Route("api/[controller]")]
    public class StripeController : Controller
    {
        private readonly IStripeAppService _stripeService;
        private readonly UserManager<AppUser> _userManager;

        public StripeController(IStripeAppService stripeService, UserManager<AppUser> userManager)
        {
            _userManager = userManager;
            _stripeService = stripeService;
        }

        [HttpPost("customer/add")]
        public async Task<ActionResult<StripeCustomer>> AddStripeCustomer(
            [FromBody] AddStripeCustomer customer,
            CancellationToken ct)
        {
            StripeCustomer createdCustomer = await _stripeService.AddStripeCustomerAsync(
                customer,
                ct);

            return StatusCode(StatusCodes.Status200OK, createdCustomer);
        }

        [HttpPost("payment/add")]
        public async Task<ActionResult<StripePayment>> AddStripePayment(
            [FromBody] AddStripePayment payment,
            CancellationToken ct)
        {
            StripePayment createdPayment = await _stripeService.AddStripePaymentAsync(
                payment,
                ct);

            return StatusCode(StatusCodes.Status200OK, createdPayment);

            
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
    }
}

