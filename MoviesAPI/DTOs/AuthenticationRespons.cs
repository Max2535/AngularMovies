using System;

namespace MoviesAPI.DTOs
{
    public class AuthenticationRespons
    {
        public string Token {get;set;}
        public DateTime Expiration { get; set; }
    }
}