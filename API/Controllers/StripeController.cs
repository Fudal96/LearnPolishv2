using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Stripe;

namespace Stripe_Payments_Web_Api.Controllers
{
    [Route("api/[controller]")]
    public class StripeController : Controller
    {
        private readonly UserManager<AppUser> _userManager;

        public StripeController(UserManager<AppUser> userManager)
        {
            _userManager = userManager;
        }

        
    [HttpGet("products")]
    public IActionResult Products()
    {
        StripeConfiguration.ApiKey = "sk_test_51N1AX9GrXwZ3ORKWnC0IEHkAj2NT9jneEc96VZVN9PAAIWUdde45X5l8BTBqXQDTH64L2SYiMLsGw6JYsJwB3BK400zcg8Q7Xe";

        var options = new ProductListOptions
        {
        Limit = 3,
        };
        var service = new ProductService();
        StripeList<Product> products = service.List(
        options);

        return Ok(products);
    }


       
    }
}




         