using System.ComponentModel.DataAnnotations;

namespace API.ViewModels
{

public class ResetPasswordModel
{
    [Required]
    [DataType(DataType.Password)]
    public string Password { get; set; }

    [DataType(DataType.Password)]
    [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
    public string ConfirmPassword { get; set; }

   [Required]
	public string Token { get; set; }
    
    [Required]
	public string UserId { get; set; }
}
}