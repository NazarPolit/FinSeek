using FinSeek.Domain.Entities;
using FinSeek.Domain.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinSeek.Domain.Interfaces
{
	public interface ICommentRepository : IGenericRepository<Comment>
	{
		Task<List<Comment>> GetAllWithUserAsync();
		Task<Comment?> GetByIdWithUserAsync(int id);
		Task<List<Comment>> GetAllWithQueryAsync(CommentQueryObject query);
	}
}
