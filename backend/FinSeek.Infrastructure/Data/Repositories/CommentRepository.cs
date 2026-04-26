using FinSeek.Domain.Entities;
using FinSeek.Domain.Helpers;
using FinSeek.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace FinSeek.Infrastructure.Data.Repositories
{
	public class CommentRepository : GenericRepository<Comment>, ICommentRepository
	{
		private readonly ApplicationDbContext _context;

		public CommentRepository(ApplicationDbContext context) : base(context)
		{
			_context = context;
		}

		public async Task<List<Comment>> GetAllWithUserAsync()
		{
			return await _context.Comments.Include(c => c.AppUser).ToListAsync();
		}

		public async Task<Comment?> GetByIdWithUserAsync(int id)
		{
			return await _context.Comments.Include(c => c.AppUser).FirstOrDefaultAsync(c => c.Id == id);
		}
		public async Task<List<Comment>> GetAllWithQueryAsync(CommentQueryObject query)
		{
			var comments = _context.Comments.Include(c => c.AppUser).AsQueryable();

			if (!string.IsNullOrWhiteSpace(query.Symbol))
			{
				comments = comments.Where(c => c.Stock != null && c.Stock.Symbol.ToLower() == query.Symbol.ToLower());
			}

			if (query.IsDescending)
			{
				comments = comments.OrderByDescending(c => c.CreatedOn);
			}
			else
			{
				comments = comments.OrderBy(c => c.CreatedOn);
			}

			return await comments.ToListAsync();
		}
	}
}