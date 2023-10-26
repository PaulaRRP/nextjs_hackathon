'use client';
import React, { useState, useEffect } from "react";
import { Card, Divider, Text, TextInput, Button, NumberInput, Title, Flex, Grid, SearchSelect, SearchSelectItem, Switch} from '@tremor/react';
import Chart from './chart';
let csvToJson = require('convert-csv-to-json');
// csvToJson.parseSubArray('*',',').getJsonFromCsv('myInputFile.csv');

const website = [
  { name: '/home', value: 1230 },
  { name: '/contact', value: 751 },
  { name: '/gallery', value: 471 },
  { name: '/august-discount-offer', value: 280 },
  { name: '/case-studies', value: 78 }
];

const shop = [
  { name: '/home', value: 453 },
  { name: '/imprint', value: 351 },
  { name: '/shop', value: 271 },
  { name: '/pricing', value: 191 }
];

const app = [
  { name: '/shop', value: 789 },
  { name: '/product-features', value: 676 },
  { name: '/about', value: 564 },
  { name: '/login', value: 234 },
  { name: '/downloads', value: 191 }
];


export default function DashboardPage() {

  const [file, setFile] = useState();
  const [operationValue, setOperationValue] = useState("");
  const [seriesValue, setSeriesValue] = useState("");
  const [isSwitchOn, setIsSwitchOn] = useState<boolean>(false);
  const [isSwitchOnAut, setIsSwitchAutOn] = useState<boolean>(false);
  const [fileValue, setFileValue] = useState({});
  const [minValue, setMinValue] = useState();
  const [maxValue, setMaxValue] = useState();
  const [minDivValue, setMinDivValue] = useState();
  const [maxDivValue, setMaxDivValue] = useState();
  const [minTimeValue, setMinTimeValue] = useState();
  const [maxTimeValue, setMaxTimeValue] = useState();


  const handleSwitchChange = (value: boolean) => {
    setIsSwitchOn(value);
  };

  const handleSwitchAutChange = (value: boolean) => {
    setIsSwitchAutOn(value);
  };

  useEffect(() => {
    
    //CHAMAR A ROTA PARA PEGAR AS SÉRIES UPADAS AQUI DENTRO
  });

  const csvJSON = (csv, titulo) => {
    const lines = csv.split('\n')
    let result = {
      titulo: titulo,
      linhas: [], //sao os anos posicao 0
      colunas: [],
      valores: [], //array de arrays que sao as linhas
    }
    const headers = lines[0].split('"')
    result.colunas = headers.filter((header => header.length > 3))

    for (let i = 1; i < lines.length; i++) {        
        if (!lines[i])
            continue

        const currentline = lines[i].split(',')

        for (let j = 0; j < headers.length; j++) {
          if(!currentline[j])
            continue

          let valor = currentline[j].replace(/[\s\r]/g, '');
          if(j === 0){
            result.linhas.push(valor.split(",")[0])
          }else{
            result.valores.push(valor.split(","))
          }
        }
    }

    return result
}

  const handleOnChange = (e) => {
      setFile(e.target.files[0]);
  };

  const handleOnSubmitFile = (e) => {
    const fileReader = new FileReader();

    e.preventDefault();


    if (file) {
        fileReader.onload = function (event) {
            const csvOutput = event.target.result;
        };

        fileReader.readAsText(file);

        fileReader.onload = function(e) {
          let rawLog = fileReader.result;
          
          const json = csvJSON(rawLog, file.name)

          setFileValue(json)
      };
    }
};

  const handleOnSubmit = (e) => {
      
  };

  const handleDownloadCSV = (e) => {
    let linhas = []
    fileValue.valores.forEach((arrayValor, index) => {
        let ano = fileValue.linhas[index]
        let valores = arrayValor

        linhas.push([ano, ...valores])
    })

    let strColunas = fileValue.colunas.map(coluna => `"${coluna}"`).join(",")
    let strLinhas = linhas.map(linha => {
      return `"${linha.join('","')}"`
    })

    const csvContent = `data:text/csv;charset=utf-8," ",${strColunas},/r,${strLinhas.join(",/r,")}`

    console.log(csvContent)
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");

    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "derivado.csv");
    
    
    document.body.appendChild(link);
    link.click();

  }


  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
        <Card className="col-span-1">
            <Title>Gerar Derivado</Title>
            <Flex
              justifyContent="start"
              alignItems="baseline"
              className="space-x-2"
            >
              <Text>Ou faça upload do csv</Text>
            </Flex>
            <div className="align-center">
              <form>
                  <input
                      className="mt-4"
                      type={"file"}
                      id={"csvFileInput"}
                      accept={".csv"}
                      onChange={handleOnChange}
                  />

                  <Button 
                      className="mt-4 bg-cyan-700 border-cyan-700 hover:bg-cyan-800"
                      size="xs"
                      variant="primary"
                      onClick={(e) => {
                          handleOnSubmitFile(e);
                      }}
                  >
                      importar arquivo
                  </Button>
              </form>
            </div>
            <Divider>Gere o derivado:</Divider>
            <div className="w-full">
              <div className="w-full">
                <SearchSelect placeholder="Selecione a Série" onValueChange={(value) => {setSeriesValue(value)}}>
                  {/* AQUI VAI TER UM FOREACH PARA AS SERIES */}
                  <SearchSelectItem value="1">
                      Diferenciação
                  </SearchSelectItem>
                </SearchSelect>
              </div>
              <div className="w-full mt-4">
                <SearchSelect placeholder="Selecione a Operação" onValueChange={(value) => {setOperationValue(value)}}>
                    <SearchSelectItem value="1">
                      Diferenciação
                    </SearchSelectItem>
                    <SearchSelectItem value="2">
                      Transformação Logarítimica
                    </SearchSelectItem>
                    <SearchSelectItem value="3">
                      Integração
                    </SearchSelectItem>
                    <SearchSelectItem value="4">
                      Autocorrelação
                    </SearchSelectItem>
                    <SearchSelectItem value="5">
                      Média Móvel
                    </SearchSelectItem>
                    <SearchSelectItem value="6">
                      Decomposição
                    </SearchSelectItem>
                    <SearchSelectItem value="7">
                      Agrupamento por Coluna
                    </SearchSelectItem>
                </SearchSelect>
                <TextInput className="mt-4" placeholder="Digite a Coluna" />
              </div>
              <div className="mt-8">
                <Text>Inserção de Valores</Text>
                <div className="flex items-center space-x-3 mt-4">
                  <Switch id="switch" name="switch" checked={isSwitchOn} onChange={handleSwitchChange} />
                  <label htmlFor="switch" className="text-sm text-gray-500">
                    Preencher Valores Nulos
                  </label>
                </div>
                <div className="flex items-center space-x-3 mt-4">
                  <Switch id="switch" name="switch" checked={isSwitchOnAut} onChange={handleSwitchAutChange} />
                  <label htmlFor="switch" className="text-sm text-gray-500">
                    Automático
                  </label>
                </div>
                <Text className="mt-4">Definir limites</Text>
                <div className="mt-4">
                  <Text className="">Limite de valores</Text>
                  <Grid numItemsSm={1} numItemsLg={2} className="gap-4">
                    <NumberInput placeholder="Mínimo" />
                    <NumberInput placeholder="Máximo" />
                  </Grid>
                </div>
                <div className="mt-4">
                  <Text className="">Limite de Divergência</Text>
                  <Grid numItemsSm={1} numItemsLg={2} className="gap-4">
                    <NumberInput placeholder="Mínimo" />
                    <NumberInput placeholder="Máximo" />
                  </Grid>
                </div>
                <div className="mt-4">
                  <Text className="">Intervalo de Tempo</Text>
                  <Grid numItemsSm={1} numItemsLg={2} className="gap-4">
                    <TextInput placeholder="Mínimo" />
                    <TextInput placeholder="Máximo" />
                  </Grid>
                </div>
              </div>
              <Button 
                      className="mt-10 bg-cyan-700 border-cyan-700 hover:bg-cyan-800"
                      size="xs"
                      variant="primary"
                      onClick={(e) => {
                          handleOnSubmit(e);
                      }}
                  >
                      Gerar Derivado
                  </Button>

                  <Button 
                      className="mt-10 bg-cyan-700 border-cyan-700 hover:bg-cyan-800 ml-10"
                      size="xs"
                      variant="primary"
                      onClick={(e) => {
                          handleDownloadCSV(e);
                      }}
                  >
                      Download do Derivado
                  </Button>
            </div>
          </Card>
          <div className="col-span-2">
            <div>
              <Chart titulo="Original" />
            </div>
            <div className="mt-2">
              <Chart titulo="Derivado" />
            </div>
          </div>
      </Grid>
    </main>
  );
}
