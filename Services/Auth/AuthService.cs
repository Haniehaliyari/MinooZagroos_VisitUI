using System.Net.Http.Json;
using Web.Models.Auth;

namespace MyProject.Services.Auth;

public class AuthService
{
    private readonly IHttpClientFactory _httpClientFactory;

    public AuthService(IHttpClientFactory httpClientFactory)
    {
        _httpClientFactory = httpClientFactory;
    }

    public async Task<LoginResponseDTO> LoginAsync(LoginRequestDTO model)
    {
        var client = _httpClientFactory.CreateClient("BackendApi");
        var response = await client.PostAsJsonAsync("api/v1/auth/login", model);

        if (!response.IsSuccessStatusCode)
        {
            var error = await response.Content.ReadFromJsonAsync<ApiErrorResponse>();
            throw new InvalidOperationException(error?.Message ?? "نام کاربری یا رمز عبور اشتباه است");
        }

        var result = await response.Content.ReadFromJsonAsync<ApiResponse<LoginResponseDTO>>();
        if (result?.Success != true || result.Data == null)
            throw new InvalidOperationException(result?.Message ?? "خطا در ورود به سیستم");

        return result.Data;
    }
}

public class ApiResponse<T>
{
    public bool Success { get; set; }
    public string? Message { get; set; }
    public T? Data { get; set; }
}

public class ApiErrorResponse
{
    public string? Message { get; set; }
}
