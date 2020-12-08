using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Application.Validators;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.User
{
    public class Register
    {
        public class Command : IRequest<UserDto>
        {
            public string DisplayName { get; set; }
            public string UserName { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.DisplayName).NotEmpty();
                RuleFor(x => x.UserName).NotEmpty();
                RuleFor(x => x.Email).NotEmpty().EmailAddress();
                RuleFor(x => x.Password).Password();


            }
        }
        public class Handler : IRequestHandler<Command, UserDto>
        {
            private readonly DataContext _db;
            private readonly UserManager<AppUser> _userManager;
            public IJwtGenerator _jwtGenerator { get; set; }
            public Handler(DataContext db, UserManager<AppUser> userManager, IJwtGenerator jwtGenerator)
            {
                _jwtGenerator = jwtGenerator;
                _userManager = userManager;
                _db = db;
            }

            public async Task<UserDto> Handle(Command request, CancellationToken cancellationToken)
            {
                if (await _db.Users.Where(x => x.Email == request.Email).AnyAsync())
                    throw new RestException(HttpStatusCode.BadRequest, new { Email = "Email already exists" });

                if (await _db.Users.Where(x => x.UserName == request.UserName).AnyAsync())
                    throw new RestException(HttpStatusCode.BadRequest, new { UserName = "Username already exists" });

                var user = new AppUser
                {
                    DisplayName = request.DisplayName,
                    Email = request.Email,
                    UserName = request.UserName,
                };



                var result = await _userManager.CreateAsync(user, request.Password);

                if (result.Succeeded)
                {
                    return new UserDto
                    {
                        DisplayName = user.DisplayName,
                        Token = _jwtGenerator.CreateToken(user),
                        UserName = user.UserName,
                    };
                }

                throw new Exception("Problem saving changes");
            }


        }
    }
}