using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _config;
        private readonly SymmetricSecurityKey _key;

        public TokenService(IConfiguration config)
        {
            _config = config;
            _key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_config["Key"]));
        }
        public string CreateToken(AppUser user)
        {
            var lst = new List<Claim>(){
                new Claim(JwtRegisteredClaimNames.NameId, user.UserName)
            };
            var cred = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

            var desc = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(lst),
                Expires = DateTime.Today.AddDays(31),
                SigningCredentials = cred
            };

            var handler = new JwtSecurityTokenHandler();
            
            var token = handler.CreateToken(desc);
            return handler.WriteToken(token);
        }
    }
}