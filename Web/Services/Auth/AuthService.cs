using Microsoft.AspNetCore.Components.Server.ProtectedBrowserStorage;
using System.Net.Http.Json;
using Web.Models.Auth;

namespace MyProject.Services.Auth;

public class AuthService
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly ProtectedSessionStorage _sessionStorage;
    private const string TokenKey = "authToken";

    public AuthService(
        IHttpClientFactory httpClientFactory,
        ProtectedSessionStorage sessionStorage)
    {
        _httpClientFactory = httpClientFactory;
        _sessionStorage = sessionStorage;
    }

    // ============================================
    //  ۱. ورود (Login)
    // ============================================
    public async Task<LoginResponseDTO> LoginAsync(LoginRequestDTO model)
    {
        var client = _httpClientFactory.CreateClient("BackendApi");
        var response = await client.PostAsJsonAsync("api/v1/auth/login", model);

        if (!response.IsSuccessStatusCode)
        {
            var error = await response.Content.ReadFromJsonAsync<ApiErrorResponse>();
            throw new Exception(error?.Message ?? "نام کاربری یا رمز عبور اشتباه است");
        }

        var result = await response.Content.ReadFromJsonAsync<ApiResponse<LoginResponseDTO>>();

        if (result?.Success != true || result.Data == null)
            throw new Exception(result?.Message ?? "خطا در ورود به سیستم");

        // ✅ ذخیره Token در Session Storage
        await _sessionStorage.SetAsync(TokenKey, result.Data.Token);

        return result.Data;
    }

    // ============================================
    //  ۲. خروج (Logout)
    // ============================================
    public async Task LogoutAsync()
    {
        await _sessionStorage.DeleteAsync(TokenKey);
    }

    // ============================================
    //  ۳. خواندن Token
    // ============================================
    public async Task<string?> GetTokenAsync()
    {
        var result = await _sessionStorage.GetAsync<string>(TokenKey);
        return result.Success ? result.Value : null;
    }
}

// ============================================
//  مدل‌های کمکی
// ============================================

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