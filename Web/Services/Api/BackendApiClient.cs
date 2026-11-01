using System.Net.Http.Headers;
using Microsoft.AspNetCore.Components.Authorization;

namespace MyProject.Services.Api;

/// <summary>
/// Creates BackendApi clients authenticated with the JWT stored in the
/// server-side authentication cookie's access_token claim.
/// </summary>
public sealed class BackendApiClient
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly AuthenticationStateProvider _authenticationStateProvider;

    public BackendApiClient(
        IHttpClientFactory httpClientFactory,
        AuthenticationStateProvider authenticationStateProvider)
    {
        _httpClientFactory = httpClientFactory;
        _authenticationStateProvider = authenticationStateProvider;
    }

    public async Task<HttpClient> CreateAuthorizedClientAsync()
    {
        var authenticationState =
            await _authenticationStateProvider.GetAuthenticationStateAsync();

        var token = authenticationState.User.FindFirst("access_token")?.Value;

        if (string.IsNullOrWhiteSpace(token))
        {
            throw new UnauthorizedAccessException(
                "توکن احراز هویت در کوکی کاربر یافت نشد. لطفاً دوباره وارد شوید.");
        }

        var client = _httpClientFactory.CreateClient("BackendApi");
        client.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", token);

        return client;
    }
}
