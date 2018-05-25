using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace Trabalho_Final_Front
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {

            config.MapHttpAttributeRoutes();


            #region Formatação JSON e XML

            // Desligar o formatador do XML.
            config.Formatters.Remove(config.Formatters.XmlFormatter);

            // Impedir referências circulares no JSON.
            // Nota: isto é uma má ideia, porque esconde erros no nosso código.
            // É preferível usar a anotação [JsonIgnore] no campo que se quer ignorar.
            config.Formatters.JsonFormatter.SerializerSettings.ReferenceLoopHandling =
                Newtonsoft.Json.ReferenceLoopHandling.Ignore;

            // Pretty-print do JSON
            config.Formatters.JsonFormatter.SerializerSettings.Formatting =
                Newtonsoft.Json.Formatting.Indented;

            // Opcional: Converter os nomes de propriedades PascalCase (a la .net)
            // para camelCase (a la Java/JavaScript).
            // Descomentar as duas seguintes linhas mudará o JSON devolvido.

            //config.Formatters.JsonFormatter.SerializerSettings.ContractResolver =
            //    new Newtonsoft.Json.Serialization.CamelCasePropertyNamesContractResolver();

            #endregion


            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
