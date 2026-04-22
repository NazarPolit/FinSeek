using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinSeek.Domain.Entities
{
	public class AppUser : IdentityUser
	{
		public List<Portfolio> Portfolios { get; set; } = new List<Portfolio>();
	}
}
