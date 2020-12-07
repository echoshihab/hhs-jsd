using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Patients
{
    public class List
    {
        public class PatientsEnvelope
        {
            public List<Patient> Patients { get; set; }
            public int PatientCount { get; set; }
        }

        public class Query : IRequest<PatientsEnvelope>
        {

        }

        public class Handler : IRequestHandler<Query, PatientsEnvelope>
        {
            private readonly DataContext _db;
            public Handler(DataContext db)
            {
                _db = db;

            }


            public async Task<PatientsEnvelope> Handle(Query request, CancellationToken cancellationToken)
            {

                var queryable = _db.Patients
                                .OrderBy(x => x.FirstName)
                                .ThenBy(x => x.LastName)
                                .AsQueryable();

                var patients = await queryable.ToListAsync();

                return new PatientsEnvelope
                {
                    Patients = patients,
                    PatientCount = queryable.Count()
                };


            }
        }
    }
}
