using System.ComponentModel.DataAnnotations;

namespace API.ViewModels
{

public class ForgotPasswordModel
{
    [Required]
    public string Email { get; set; }
}
}