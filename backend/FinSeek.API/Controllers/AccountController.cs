using FinSeek.Application.DTOs.Account;
using FinSeek.Application.Interfaces;
using FinSeek.Domain.Entities;
using FinSeek.Domain.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FinSeek.API.Controllers
{
    [Route("api/account")]
    public class AccountController : BaseController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenService _tokenService;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IEmailService _emailService;

        public AccountController(UserManager<AppUser> userManager,
            ITokenService tokenService,
            SignInManager<AppUser> signInManager,
            IEmailService emailService)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _signInManager = signInManager;
            _emailService = emailService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var appUser = new AppUser
                {
                    UserName = registerDto.UserName,
                    Email = registerDto.Email,
                };

                var createUser = await _userManager.CreateAsync(appUser, registerDto.Password);

                if (createUser.Succeeded)
                {
                    var roleResult = await _userManager.AddToRoleAsync(appUser, "User");

                    if (roleResult.Succeeded)
                    {
                        var token = await _userManager.GenerateEmailConfirmationTokenAsync(appUser);

                        var encodedToken = Uri.EscapeDataString(token);

                        var confirmationLink = $"http://localhost:3000/confirm-email?userId={appUser.Id}&token={encodedToken}";

                        var emailBody = $@"
                        <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 10px;'>
                            <h2 style='color: #2563eb;'>Welcome to FinSeek, {appUser.UserName}!</h2>
                            <p>Thank you for registering. Please confirm your email address by clicking the button below:</p>
                            <div style='text-align: center; margin: 30px 0;'>
                                <a href='{confirmationLink}' style='background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;'>Confirm Email</a>
                            </div>
                            <p style='color: #666; font-size: 12px;'>If the button doesn't work, copy and paste this link into your browser:<br>{confirmationLink}</p>
                        </div>";

                        await _emailService.SendEmailAsync(appUser.Email, "Confirm your FinSeek Account", emailBody);

                        return Ok(new { message = "Registration successful. Please check your email to confirm your account." });
                    }
                    else
                    {
                        return BadRequest(roleResult.Errors);
                    }
                }
                else
                {
                    return BadRequest(createUser.Errors);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _userManager.Users.FirstOrDefaultAsync(u => u.UserName == loginDto.UserName);

            if (user == null)
                return Unauthorized("Invalid username");

            if (!await _userManager.IsEmailConfirmedAsync(user))
            {
                return Unauthorized("Please confirm your email address before logging in. Check your email.");
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded)
                return Unauthorized("Username not found and/or password incorrect");

            return Ok(
                new NewUserDto
                {
                    UserName = user.UserName,
                    Email = user.Email,
                    Token = _tokenService.CreateToken(user)
                }
            );
        }

        [HttpPost("confirm-email")]
        public async Task<IActionResult> ConfirmEmail([FromQuery] string userId, [FromQuery] string token)
        {
            if (string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(token))
                return BadRequest("Invalid confirmation request.");

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return NotFound("User not found.");

            var result = await _userManager.ConfirmEmailAsync(user, token);

            if (result.Succeeded)
            {
                return Ok(new { message = "Email confirmed successfully!" });
            }

            return BadRequest("Email confirmation failed.");
        }
        [HttpPost("resend-confirmation")]
        public async Task<IActionResult> ResendConfirmation([FromQuery] string email)
        {
            if (string.IsNullOrEmpty(email)) return BadRequest("Email is required.");

            var user = await _userManager.FindByEmailAsync(email);
            if (user == null) return Ok("If an account exists, a new link has been sent.");

            if (await _userManager.IsEmailConfirmedAsync(user))
                return BadRequest("Email is already confirmed.");

            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            var confirmationLink = $"http://localhost:3000/confirm-email?userId={user.Id}&token={token}";

            Console.WriteLine($"\n[RESEND LINK]: {confirmationLink}\n");

            return Ok(new { message = "Confirmation link has been resent." });
        }
    }
}