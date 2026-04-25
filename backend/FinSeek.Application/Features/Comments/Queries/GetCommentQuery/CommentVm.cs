using AutoMapper;
using FinSeek.Application.Common.Mappings;
using FinSeek.Domain.Entities;

namespace FinSeek.Application.Features.Comments.Queries.GetCommentQuery
{
	public class CommentVm : IMapWith<Comment>
	{
		public int Id { get; set; }
		public string Title { get; set; } = string.Empty;
		public string Content { get; set; } = string.Empty;
		public DateTime CreatedOn { get; set; } = DateTime.Now;
		public int? StockId { get; set; }
		public string CreatedBy { get; set; } = string.Empty;

		public void Mapping(Profile profile)
		{
			profile.CreateMap<Comment, CommentVm>()
				.ForMember(commentDto => commentDto.Id, opt => opt.MapFrom(comment => comment.Id))
				.ForMember(commentDto => commentDto.Title, opt => opt.MapFrom(comment => comment.Title))
				.ForMember(commentDto => commentDto.Content, opt => opt.MapFrom(comment => comment.Content))
				.ForMember(commentDto => commentDto.CreatedOn, opt => opt.MapFrom(comment => comment.CreatedOn))
				.ForMember(commentDto => commentDto.StockId, opt => opt.MapFrom(comment => comment.StockId))
				.ForMember(commentDto => commentDto.CreatedBy, opt => opt.MapFrom(comment => comment.AppUser.UserName));
		}
	}
}