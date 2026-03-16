using AutoMapper;
using FinSeek.Application.Common.Mappings;
using FinSeek.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinSeek.Application.Features.Comments.Queries.GetCommentList
{
    public class CommentLookupDto : IMapWith<Comment>
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public int? StockId { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Comment, CommentLookupDto>()
                .ForMember(commentDto => commentDto.Id,
                    opt => opt.MapFrom(comment => comment.Id))
                .ForMember(commentDto => commentDto.Title,
                    opt => opt.MapFrom(comment => comment.Title))
                .ForMember(commentDto => commentDto.Content,
                    opt => opt.MapFrom(comment => comment.Content))
                .ForMember(commentDto => commentDto.CreatedOn,
                    opt => opt.MapFrom(comment => comment.CreatedOn))
                 .ForMember(commentDto => commentDto.StockId,
                    opt => opt.MapFrom(comment => comment.StockId));
        }
    }
}
