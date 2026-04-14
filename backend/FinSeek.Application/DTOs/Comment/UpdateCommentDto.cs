using AutoMapper;
using FinSeek.Application.Common.Mappings;
using FinSeek.Application.Features.Comments.Commands;
using FinSeek.Application.Features.Stocks.Commands;

namespace FinSeek.Application.DTOs.Comment
{
	public class UpdateCommentDto : IMapWith<UpdateStockCommand>
	{
		public string Title { get; set; } = string.Empty;
		public string Content { get; set; } = string.Empty;

		public void Mapping(Profile profile)
		{
			profile.CreateMap<UpdateCommentDto, UpdateCommentCommand>()
				.ForMember(commentCommand => commentCommand.Id, opt => opt.Ignore())
				.ForMember(commentCommand => commentCommand.Title, opt => opt.MapFrom(commentDto => commentDto.Title))
				.ForMember(commentCommand => commentCommand.Content, opt => opt.MapFrom(commentDto => commentDto.Content));
		}
	}
}