using FinSeek.Application.DTOs.Register;
using FinSeek.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace FinSeek.API.Controllers
{
	[Route("api/account")]
	public class AccountController : BaseController
	{
		private readonly UserManager<AppUser> _userManager;

		public AccountController(UserManager<AppUser> userManager)
        {
			_userManager = userManager;
		}

		[HttpPost("register")]
		public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
		{
			try
			{
				if (!ModelState.IsValid)
				{
					return BadRequest(ModelState);
				}

				var appuser = new AppUser
				{
					UserName = registerDto.UserName,
					Email = registerDto.Email,
				};

				var createUser = await _userManager.CreateAsync(appuser, registerDto.Password);

				if (createUser.Succeeded)
				{
					var roleResult = await _userManager.AddToRoleAsync(appuser, "User");

					if (roleResult.Succeeded)
					{
						return Ok("User created");
					}
					else
					{
						return StatusCode(500, roleResult.Errors);
					}
				}
				else
				{
					return StatusCode(500, createUser.Errors);
				}
			}
			catch (Exception ex)
			{
				return StatusCode(500, ex);
			}
		}
    }
}
