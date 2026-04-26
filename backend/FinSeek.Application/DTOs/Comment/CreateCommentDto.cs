using AutoMapper;
using FinSeek.Application.Common.Mappings;
using FinSeek.Application.Features.Comments.Commands;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinSeek.Application.DTOs.Comment
{
	public class CreateCommentDto : IMapWith<CreateCommentCommand>
	{
		public string Title { get; set; } = string.Empty;
		public string Content { get; set; } = string.Empty;

		public void Mapping(Profile profile)
		{
			profile.CreateMap<CreateCommentDto, CreateCommentCommand>();
		}
	}
}
