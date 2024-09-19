import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useEffect } from "react";
import Select from "react-select";
import { Box, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import { getCustomStyle } from "utils/react-select";
import { ReactSelectValueProps } from "types";
import { useIncomeAndOutcome } from "hooks/react-query/useOrder";
import PageLoaderTwo from "components/PageLoaderTwo";

const listYear = [
  { value: "2021", label: "2021" },
  { value: "2022", label: "2022" },
  { value: "2023", label: "2023" },
  { value: "2024", label: "2024" },
  { value: "2025", label: "2025" },
  { value: "2026", label: "2026" },
  { value: "2027", label: "2027" },
  { value: "2028", label: "2028" },
  { value: "2029", label: "2029" },
  { value: "2030", label: "2030" },
  { value: "2031", label: "2031" },
  { value: "2032", label: "2032" },
  { value: "2033", label: "2033" },
];

const IncomeModule = (): JSX.Element => {
  const { control, watch, setValue } = useForm({
    defaultValues: {
      filterIncome: "",
    },
  });

  const { filterIncome } = watch();

  const filterIncomeValue = (filterIncome as unknown as ReactSelectValueProps)
    ?.value;

  const { data: incomeAndOutcomeData, isLoading } = useIncomeAndOutcome(
    filterIncomeValue ? Number(filterIncomeValue) : 2024
  );

  const setDefaultFilter = (): void => {
    setValue(
      "filterIncome",
      listYear?.find((year) => year.value === "2024") as any
    );
  };

  useEffect(() => {
    setDefaultFilter();
  }, []);

  if (isLoading) {
    return <PageLoaderTwo />;
  }

  return (
    <Box sx={{ paddingTop: "20px", display: "flex", flexDirection: "column" }}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{ px: 3, mb: 3 }}
      >
        <Typography
          variant="h3"
          fontSize="26px"
          fontWeight={700}
          letterSpacing="-0.01em"
        >
          Pemasukan dan Pengeluaran Tahunan
        </Typography>

        <Controller
          name="filterIncome"
          control={control}
          render={({ field, fieldState: { error } }) => {
            return (
              <Box className="form-control" sx={{ width: "20%" }}>
                <Select<ReactSelectValueProps>
                  {...(field as any)}
                  inputId="filterIncome"
                  classNamePrefix="select"
                  getOptionLabel={(option) => option.label}
                  getOptionValue={(option) => option.value}
                  options={listYear || []}
                  placeholder="Pilih Tahun"
                  styles={getCustomStyle(error)}
                />

                {error && (
                  <Typography
                    variant="caption"
                    fontSize="12px"
                    fontWeight={600}
                    color="red"
                  >
                    {error.message}
                  </Typography>
                )}
              </Box>
            );
          }}
        />
      </Box>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          width={500}
          height={300}
          data={incomeAndOutcomeData?.data[Number(filterIncomeValue)] || []}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="income"
            fill="#8884d8"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          <Bar
            dataKey="outcome"
            fill="#82ca9d"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default IncomeModule;
