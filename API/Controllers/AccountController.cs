

using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;
        public AccountController(UserManager<AppUser> userManager, ITokenService tokenService, IMapper mapper)
        {
            _userManager = userManager;
            _mapper = mapper;
            _tokenService = tokenService;
            
        }

        [HttpPost("register")] // api/account/register - in order to access
         public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
         {
            if (await UserExists(registerDto.Username)) return BadRequest("Username is already taken");

            // we're going from ApUser to RegisterDto
           var user = _mapper.Map<AppUser>(registerDto);


                user.UserName = registerDto.Username.ToLower();
                

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded) return BadRequest("Password must have at least 1 uppercase, 1 lowercase and 1 digit ");

            var roleResult = await _userManager.AddToRoleAsync(user, "Member");

            if (!roleResult.Succeeded) return BadRequest(result.Errors);

            return new UserDto
            {
                Username = user.UserName,
                Token = await _tokenService.CreateToken(user),
            };
         }

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

         private async Task<bool> UserExists(string username)
         {
            return await _userManager.Users.AnyAsync(x => x.UserName == username.ToLower());
         }

    }
}