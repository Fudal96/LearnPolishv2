
using System.Collections.Generic;
using API.Interfaces;
using Stripe;

namespace API.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly IConfiguration _config;
        public PaymentService(IConfiguration config)
        {
            _config = config;
        }

        public async Task CreatePaymentIntent()
        {
            StripeConfiguration.ApiKey = _config["StripeSettings:SecretKey"];
            
            var service = new PaymentIntentService();

            PaymentIntent intent;

            var options = new PaymentIntentCreateOptions
            {
                 Amount = (long) 1000,
                 Currency = "usd",
                 PaymentMethodTypes = new List<string> {"card"}
            };
            intent = await service.CreateAsync(options);

           
        }
    }
}