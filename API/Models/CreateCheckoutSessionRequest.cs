using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace API.Models
{
	public class CreateCheckoutSessionRequest
	{
		[JsonProperty("priceId")]
		[Required]
		public string PriceId { get; set; }

	}
}