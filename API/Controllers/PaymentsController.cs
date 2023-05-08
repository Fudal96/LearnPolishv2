
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PaymentsController : BaseApiController
    {
        private readonly IPaymentService _paymentService;
        public PaymentsController(IPaymentService paymentService)
        {
            _paymentService = paymentService;
            
        }

        //[Authorize]
        [AllowAnonymous]
        [HttpPost("{payment}")]
        public Task<ActionResult> CreatePaymentIntent()
        {
              return (Task<ActionResult>)_paymentService.CreatePaymentIntent();
    }
}
}