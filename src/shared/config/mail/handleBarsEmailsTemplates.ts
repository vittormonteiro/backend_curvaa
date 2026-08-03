import handlebars from "handlebars";
import fs from "fs";

/* Importando o Fs apara leitura do aquivo q foi criando , no qual ele passar a ser um file e assim deixando de ser um template
 */
interface ITemplatesVariables{

    [key: string] : string | number;

}

interface IParserEmailTemplate {

    //Passando o arquivo como string
    file:string;
    variables:ITemplatesVariables
}
export default  class handlebarsMailTemplates {
    public async parse({file, variables}:IParserEmailTemplate):Promise<string>{

        //Lendo o arquivo com fs e passando o encoding utf8 padrão nacional
        const templateFileContent = await fs.promises.readFile(file,
            {
                encoding:'utf8'
            });

        //Aqui o handlebars vai compilar o templete que foi lido
        const parseTemplate = handlebars.compile(templateFileContent);

        return parseTemplate(variables);


    }
}