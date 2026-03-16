using AutoMapper;
using FinSeek.Application.Features.Comments.Queries.GetCommentList;
using FinSeek.Application.Features.Comments.Queries.GetCommentQuery;
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
    }
}
