using Core.Entities;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Validators
{
    public class AccountCredentialsValidator : AbstractValidator<AccountCredentials>
    {
        public AccountCredentialsValidator()
        {
            RuleFor(x => x.Email).NotEmpty().EmailAddress();
            RuleFor(x => x.UserName).NotEmpty();
            RuleFor(x => x.Password).NotEmpty();
        }
    }
}
