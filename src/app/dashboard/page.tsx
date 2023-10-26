'use client';
import React, { useState, useEffect } from "react";
import { Card, Divider, Text, Button, NumberInput, Title, Flex, Grid, SearchSelect, SearchSelectItem, Switch} from '@tremor/react';
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

const data = [
  {
    category: 'Website',
    stat: '10,234',
    data: website
  },
  {
    category: 'Online Shop',
    stat: '12,543',
    data: shop
  },
  {
    category: 'Mobile App',
    stat: '2,543',
    data: app
  }
];

export default function DashboardPage() {

  const [file, setFile] = useState();
  const [isSwitchOn, setIsSwitchOn] = useState<boolean>(false);

  const handleSwitchChange = (value: boolean) => {
    setIsSwitchOn(value);
  };

  useEffect(() => {
    const fileReader = new FileReader();
    //CHAMAR A ROTA PARA PEGAR AS SÉRIES UPADAS AQUI DENTRO
  })

  const handleOnChange = (e) => {
      setFile(e.target.files[0]);
  };

  const handleOnSubmitFile = (e) => {
    e.preventDefault();

    if (file) {
        fileReader.onload = function (event) {
            const csvOutput = event.target.result;
        };

        fileReader.readAsText(file);
    }
};

  const handleOnSubmit = (e) => {
      
  };
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
        {/* {data.map((item) => (
          <Card key={item.category}>
            <Title>{item.category}</Title>
            <Flex
              justifyContent="start"
              alignItems="baseline"
              className="space-x-2"
            >
              <Metric>{item.stat}</Metric>
              <Text>Total views</Text>
            </Flex>
            <Flex className="mt-6">
              <Text>Pages</Text>
              <Text className="text-right">Views</Text>
            </Flex>
            <BarList
              data={item.data}
              valueFormatter={(number: number) =>
                Intl.NumberFormat('us').format(number).toString()
              }
              className="mt-2"
            />
          </Card>
        ))} */}
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
                <SearchSelect placeholder="Selecione a Série" onValueChange={(value) => {}}>
                  <SearchSelectItem value="1">
                  Kilometers
                  </SearchSelectItem>
                  <SearchSelectItem value="2">
                  Meters
                  </SearchSelectItem>
                  <SearchSelectItem value="3">
                  Miles
                  </SearchSelectItem>
                  <SearchSelectItem value="4">
                  Nautical Miles
                  </SearchSelectItem>
                </SearchSelect>
              </div>
              <div className="w-full mt-4">
                <SearchSelect placeholder="Selecione a Operação" onValueChange={(value) => {}}>
                    <SearchSelectItem value="1">
                    Kilometers
                    </SearchSelectItem>
                    <SearchSelectItem value="2">
                    Meters
                    </SearchSelectItem>
                    <SearchSelectItem value="3">
                    Miles
                    </SearchSelectItem>
                    <SearchSelectItem value="4">
                    Nautical Miles
                    </SearchSelectItem>
                </SearchSelect>
              </div>
              <div className="mt-8">
                <Text>Inserção de Valores</Text>
                <div className="flex items-center space-x-3 mt-4">
                  <Switch id="switch" name="switch" checked={isSwitchOn} onChange={handleSwitchChange} />
                  <label htmlFor="switch" className="text-sm text-gray-500">
                    Automático
                  </label>
                </div>
                <Text className="mt-4">Definir limites</Text>
                <div className="mt-4">
                  <Text className="">Campo 1</Text>
                  <Grid numItemsSm={1} numItemsLg={2} className="gap-4">
                    <NumberInput placeholder="Mínimo" />
                    <NumberInput placeholder="Máximo" />
                  </Grid>
                </div>
                <div className="mt-4">
                  <Text className="">Campo 2</Text>
                  <Grid numItemsSm={1} numItemsLg={2} className="gap-4">
                    <NumberInput placeholder="Mínimo" />
                    <NumberInput placeholder="Máximo" />
                  </Grid>
                </div>
                <div className="mt-4">
                  <Text className="">Campo 3</Text>
                  <Grid numItemsSm={1} numItemsLg={2} className="gap-4">
                    <NumberInput placeholder="Mínimo" />
                    <NumberInput placeholder="Máximo" />
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
