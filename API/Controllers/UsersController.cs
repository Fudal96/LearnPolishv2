using System.Security.Claims;
using System.Xml.Schema;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
   // [Authorize]
   [AllowAnonymous]
    public class UsersController : BaseApiController
    {
        // Now we are changing it and instead of injecting DataContext we inject IUserRopository (it is kind of an abstration of an abstraction but that way it is easier to test our code)

        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        
        public UsersController(IUserRepository userRepository, IMapper mapper)
        {
            _mapper = mapper;
            _userRepository = userRepository;
            
        }
        

        // Api Endpoint so that we can request a list of users
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            var users = await _userRepository.GetMembersAsync();

            return Ok(users);

        }
        
        [HttpGet("{username}")]
        public async Task <ActionResult<MemberDto>> GetUser(string username)
        {
            return await _userRepository.GetMemberAsync(username);  
        }




    }
}