using Newtonsoft.Json;

namespace API.Models
{
	public class CreateCheckoutSessionRequest
	{
		[JsonProperty("priceId")]
		public string PriceId { get; set; }
	}
}