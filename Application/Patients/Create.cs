using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Patients
{
    public class Create
    {
        public class Command : IRequest
        {

            public string FirstName { get; set; }
            public string LastName { get; set; }
            public DateTime DateOfBirth { get; set; }
            public string Gender { get; set; }
            public long HealthCardNumber { get; set; }
            public string VersionCode { get; set; }

        }

        public class CommandValidator : AbstractValidator<Command>
        {
            private bool PassDateValidation(DateTime date)
            {
                return !date.Equals(default(DateTime));
            }
            public CommandValidator()
            {
                RuleFor(x => x.FirstName).NotEmpty();
                RuleFor(x => x.LastName).NotEmpty();
                RuleFor(x => x.DateOfBirth).Must(PassDateValidation).WithMessage("Must be a valid date");
                RuleFor(x => x.HealthCardNumber).NotNull().GreaterThan(0).WithMessage("Must be a valid health card number");
                RuleFor(x => x.VersionCode).NotEmpty();

            }

        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _db;

            public Handler(DataContext db)
            {

                _db = db;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {

                var IsDuplicatePatient = await _db.Patients.Where(x => x.HealthCardNumber == request.HealthCardNumber).FirstOrDefaultAsync();

                if (IsDuplicatePatient != null) throw new RestException(HttpStatusCode.Conflict, new { patient = "Patient with this healthcard already exists" });

                var patient = new Patient
                {

                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    DateOfBirth = request.DateOfBirth,
                    Gender = request.Gender,
                    HealthCardNumber = request.HealthCardNumber,
                    VersionCode = request.VersionCode

                };

                _db.Patients.Add(patient);


                var success = await _db.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}


