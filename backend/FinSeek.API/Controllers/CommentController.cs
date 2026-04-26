using AutoMapper;
using FinSeek.Application.DTOs.Comment;
using FinSeek.Application.DTOs.Stock;
using FinSeek.Application.Extensions;
using FinSeek.Application.Features.Comments.Commands;
using FinSeek.Application.Features.Comments.Queries.GetCommentList;
using FinSeek.Application.Features.Comments.Queries.GetCommentQuery;
using FinSeek.Application.Features.Stocks.Commands;
using FinSeek.Domain.Entities;
using FinSeek.Domain.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FinSeek.API.Controllers
{
    [Route("api/comment")]
    [ApiController]
    public class CommentController : BaseController
    {
        private readonly IMapper _mapper;

        public CommentController(IMapper mapper)
        {
            _mapper = mapper;
        }

		[HttpGet]
		[Authorize]
		public async Task<ActionResult<CommentListVm>> GetAllComments([FromQuery] CommentQueryObject queryObject)
		{
			var query = new GetCommentListQuery(queryObject);

			var vm = await Mediator.Send(query);

			return Ok(vm);
		}

		[HttpGet("{id}")]
        public async Task<ActionResult<CommentListVm>> GetCommentById(int id)
        {
            var query = new GetCommentQuery
            {
                Id = id
            };

            var vm = await Mediator.Send(query);

            return Ok(vm);
        }

		[HttpPost("{symbol}")]
		[Authorize]
		public async Task<IActionResult> CreateComment(
			[FromBody] CreateCommentDto createCommentDto,
			[FromRoute] string symbol)
		{
			var username = User.GetUsername();

			var command = _mapper.Map<CreateCommentCommand>(createCommentDto);
			command.Symbol = symbol;
			command.Username = username;

			var result = await Mediator.Send(command);

			return CreatedAtAction(
				nameof(GetCommentById),
				new { id = result.Id },
				result
			);
		}

		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteComment(int id)
		{
			await Mediator.Send(new DeleteCommentCommand { Id = id });

			return NoContent();
		}

		[HttpPut("{id}")]
		public async Task<IActionResult> UpdateStock([FromRoute] int id, [FromBody] UpdateCommentDto updateCommentDto)
		{
			var command = _mapper.Map<UpdateCommentCommand>(updateCommentDto);

			command.Id = id;

			await Mediator.Send(command);

			return NoContent();
		}

	}
}
