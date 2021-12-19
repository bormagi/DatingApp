using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;



namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _token;

        public AccountController(DataContext context, ITokenService token)
        {
            _context = context;
            _token = token;
        }

        [HttpPost("register")]
        public async Task<ActionResult<AuthorizedDto>> Register (RegisterDto registerDto)
        {
            using var hmac = new HMACSHA512();

            if (await this.UserExists(registerDto.Username)) return BadRequest("User already Exists!");
            AppUser user = new AppUser()
            {
                UserName = registerDto.Username.ToLower(),
                PasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        
             return new AuthorizedDto() {
                Username = user.UserName,
                Token = _token.CreateToken(user)              
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthorizedDto>> Login (LoginDto loginDto)
        {
            var user = await  _context.Users.SingleOrDefaultAsync(x => x.UserName == loginDto.Username.ToLower());
            if (user == null)
                return BadRequest("Bad Username!");

            using var hmac = new HMACSHA512(user.PasswordSalt);
            var userHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(loginDto.Password));
            if (!userHash.SequenceEqual(user.PasswordHash))
                return BadRequest("Bad Password!");
            
            return new AuthorizedDto() {
                Username = user.UserName,
                Token = _token.CreateToken(user)              
            };
        }

        private async Task<bool> UserExists (string username)
        {
            return await _context.Users.AnyAsync(user => user.UserName == username.ToLower());
        }

        
    }
}