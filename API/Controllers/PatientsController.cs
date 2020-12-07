using System.Threading.Tasks;
using Application.Patients;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PatientsController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List.PatientsEnvelope>> List()
        {
            return await Mediator.Send(new List.Query());
        }

    }
}