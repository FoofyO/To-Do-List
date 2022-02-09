using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Base
{
    public interface IRepository<T>
    {
        T Get(string id);
        void Create(T item);
        void Update(T item);
        void Delete(T item);
        IEnumerable<T> GetAll();
    }
}
