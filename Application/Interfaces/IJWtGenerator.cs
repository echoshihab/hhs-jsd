using Domain;
using Persistence;

namespace Application.Interfaces
{
    public interface IJwtGenerator
    {
        string CreateToken(AppUser user);

    }
}