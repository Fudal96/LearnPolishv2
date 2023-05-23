

using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using API.ViewModels;
using AutoMapper;
using Core.Services.Email;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;
        private readonly IConfiguration _config;
        private readonly IEmailSender _emailSender;
        public AccountController(UserManager<AppUser> userManager, ITokenService tokenService, IMapper mapper, IConfiguration config, IEmailSender emailSender)
        {
            _emailSender = emailSender;
            _config = config;
            _userManager = userManager;
            _mapper = mapper;
            _tokenService = tokenService;
            
        }

        [HttpPost("register")] // api/account/register - in order to access
         public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
         {
            if (await UserExists(registerDto.Username)) return BadRequest("Username is already taken");

            if (await EmailExists(registerDto.Email)) return BadRequest("This Email is already in use");

            // we're going from ApUser to RegisterDto
           var user = _mapper.Map<AppUser>(registerDto);


                user.UserName = registerDto.Username.ToLower();

                user.Email = registerDto.Email.ToLower();
                

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded) return BadRequest("Password must have at least 1 uppercase, 1 lowercase and 1 digit ");

            var userFromDb = await _userManager.FindByNameAsync(user.UserName);

            var token = await _userManager.GenerateEmailConfirmationTokenAsync(userFromDb);


            var uriBuilder = new UriBuilder(_config["ReturnPaths:ConfirmEmail"]);
				var query = HttpUtility.ParseQueryString(uriBuilder.Query);
				query["token"] = token;
				query["userid"] = userFromDb.Id.ToString();
				uriBuilder.Query = query.ToString();
				var urlString = uriBuilder.ToString();

                var senderEmail = _config["ReturnPaths:SenderEmail"];

				await _emailSender.SendEmailAsync(senderEmail, userFromDb.Email, "Confirm your email address", urlString);

            var roleResult = await _userManager.AddToRoleAsync(user, "Member");

            if (!roleResult.Succeeded) return BadRequest(result.Errors);

            return new UserDto
            {
                Username = user.UserName,
                Email = user.Email,
                Token = await _tokenService.CreateToken(user),
            };
         }

         //////////////////////////////////////////////////////////////////////////

         [HttpPost("login")]
         public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
         {
            var user = await _userManager.Users
            .SingleOrDefaultAsync(x => x.UserName == loginDto.Username);


            // if the user does not exist in our database we can't let him log in
            if (user == null) return Unauthorized("invalid username");

            var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);

            if (!result) return Unauthorized("Invalid Password");

            return new UserDto
            {
                Username = user.UserName,
                Token = await _tokenService.CreateToken(user),
            };
         }

         //////////////////////////////////////////////////////////////////////////

         [HttpPost("confirmemail")]
		public async Task<IActionResult> ConfirmEmail(ConfirmEmailViewModel model)
		{
			var user = await _userManager.FindByIdAsync(model.UserId);

			var result = await _userManager.ConfirmEmailAsync(user, model.Token);

			if (result.Succeeded)
			{
				return Ok();
			}

			return BadRequest();
		}

        //////////////////////////////////////////////////////////////////////////

            [HttpPost("forgotpassword")]
           // [ValidateAntiForgeryToken]
            public async Task<IActionResult> ForgotPassword(ForgotPasswordModel forgotPasswordModel)
            {

                var userFromDb = await _userManager.FindByEmailAsync(forgotPasswordModel.Email);

                if (userFromDb == null) return BadRequest("User not found");
                    
                var token = await _userManager.GeneratePasswordResetTokenAsync(userFromDb);

               var uriBuilder = new UriBuilder(_config["ReturnPaths:ResetPassword"]);
				var query = HttpUtility.ParseQueryString(uriBuilder.Query);
				query["token"] = token;
				query["userid"] = userFromDb.Id.ToString();
				uriBuilder.Query = query.ToString();
				var urlString = uriBuilder.ToString();

                var senderEmail = _config["ReturnPaths:SenderEmail"];

				await _emailSender.SendEmailAsync(senderEmail, userFromDb.Email, "Reset your password", urlString);

                return Ok();
            }


         ///////////////////////////////////////////////////////////////////////
        [HttpPost("resetpassword")]
        public async Task<IActionResult> ResetPassword(ResetPasswordModel resetPasswordModel)
        {
            var user = await _userManager.FindByIdAsync(resetPasswordModel.UserId);

            var result = await _userManager.ResetPasswordAsync(user, resetPasswordModel.Token, resetPasswordModel.Password);

            if (result.Succeeded)
			{
				return Ok();
			}

			return BadRequest();
        }
         ///////////////////////////////////////////////////////////////////////
         [HttpPost("sendemailconfirmationlink")]
        public async Task<IActionResult> SendEmailConfirmationLink()
        {
            ClaimsPrincipal principal = HttpContext.User as ClaimsPrincipal;
			var claim = principal.Claims.FirstOrDefault(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier");

			var userFromDb = await _userManager.FindByNameAsync(claim.Value);

            var token = await _userManager.GenerateEmailConfirmationTokenAsync(userFromDb);


            var uriBuilder = new UriBuilder(_config["ReturnPaths:ConfirmEmail"]);
				var query = HttpUtility.ParseQueryString(uriBuilder.Query);
				query["token"] = token;
				query["userid"] = userFromDb.Id.ToString();
				uriBuilder.Query = query.ToString();
				var urlString = uriBuilder.ToString();

                var senderEmail = _config["ReturnPaths:SenderEmail"];

				await _emailSender.SendEmailAsync(senderEmail, userFromDb.Email, "Confirm your email address", urlString);

                return Ok();

        }


        ///////////////////////////////////////////////////////////////////////

         private async Task<bool> UserExists(string username)
         {
            return await _userManager.Users.AnyAsync(x => x.UserName == username.ToLower());
         }

          private async Task<bool> EmailExists(string email)
         {
            return await _userManager.Users.AnyAsync(x => x.Email == email.ToLower());
         }


    }
}