using FinSeek.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinSeek.Domain.Interfaces
{
	public interface ITokenService
	{
		string CreateToken(AppUser user);
	}
}
