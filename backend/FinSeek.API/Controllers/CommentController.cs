using AutoMapper;
using FinSeek.Application.DTOs.Comment;
using FinSeek.Application.DTOs.Stock;
using FinSeek.Application.Features.Comments.Commands;
using FinSeek.Application.Features.Comments.Queries.GetCommentList;
using FinSeek.Application.Features.Comments.Queries.GetCommentQuery;
using FinSeek.Application.Features.Stocks.Commands;
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
        public async Task<ActionResult<CommentListVm>> GetAllComments()
        {
            var query = new GetCommentListQuery();

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

		[HttpPost("{stockId}")]
		public async Task<IActionResult> CreateComment(
	        [FromBody] CreateCommentDto createCommentDto,
	        [FromRoute] int stockId)
		{
			var command = _mapper.Map<CreateCommentCommand>(createCommentDto);

			command.StockId = stockId;

			var commentId = await Mediator.Send(command);

			var result = new CommentDto
			{
				Id = commentId,
				Title = command.Title,
				Content = command.Content,
				StockId = command.StockId
			};

			return CreatedAtAction(
				nameof(GetCommentById),
				new { id = commentId },
				result
			);
		}

		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteComment(int id)
		{
			await Mediator.Send(new DeleteCommentCommand { Id = id });

			return NoContent();
		}

	}
}
