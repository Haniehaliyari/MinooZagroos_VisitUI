namespace Web.Models.Auth
{
    public class LoginResponseDTO
    {
        public string Token { get; set; } = string.Empty;

        public DateTimeOffset ExpiresAt { get; set; }

        public string Username { get; set; } = string.Empty;

        public string Role { get; set; } = "Admin";
    }
}
