import {
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  OpenInNew as OpenInNewIcon,
  Tv as ViewIcon,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { WebsiteResponse } from "../../types";
import { getAllWebsites } from "../../api";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import PhaseBadge from "../../components/client/PhaseBadge";

interface CommonHeadCellProps {
  label: string;
  sortable?: boolean;
  orderBy?: keyof WebsiteResponse;
  order?: "asc" | "desc";
  onRequestSort?: (property: keyof WebsiteResponse) => void;
}

const HeadCell = ({
  label,
  sortable = false,
  orderBy,
  order,
  onRequestSort,
}: CommonHeadCellProps) => {
  const handleSortClick = () => {
    if (sortable && onRequestSort) onRequestSort(orderBy!);
  };

  return (
    <TableCell
      sx={(theme) => ({
        fontSize: "0.875em",
        color: theme.palette.common.black,
        fontWeight: 600,
      })}
    >
      {sortable ? (
        <TableSortLabel
          active={orderBy === label}
          direction={order}
          onClick={handleSortClick}
        >
          {label}
        </TableSortLabel>
      ) : (
        label
      )}
    </TableCell>
  );
};

const WebsiteViewPage = () => {
  const navigate = useNavigate()
  const [websites, setWebsites] = useState<WebsiteResponse[]>([]);
  const [orderBy, setOrderBy] = useState<keyof WebsiteResponse>("websiteId");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const handleRequestSort = (property: keyof WebsiteResponse) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const getSortedRows = (): WebsiteResponse[] => {
    return websites.sort((a, b) => {
      const isAsc = order === "asc";
      const orderByValueA = a[orderBy] ?? "";
      const orderByValueB = b[orderBy] ?? "";

      if (orderByValueA < orderByValueB) {
        return isAsc ? -1 : 1;
      }
      if (orderByValueA > orderByValueB) {
        return isAsc ? 1 : -1;
      }
      return 0;
    });
  };

  const getWebsites = async (): Promise<void> => {
    try {
      const websites = await getAllWebsites();
      setWebsites(websites);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.error("An unknown error occurred.");
      }
    }
  };

  useEffect(() => {
    getWebsites();
  }, []);

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          padding: (theme) => theme.spacing(2),
          color: (theme) => theme.palette.text.secondary,
          background: (theme) => theme.palette.background.paper,
          borderRadius: 2,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" fontWeight="600" color="primary">
              Your Websites
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TableContainer
              component={Paper}
              elevation={0}
              sx={{ border: (theme) => `1px solid ${theme.palette.grey[300]}` }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <HeadCell
                      label="Name"
                      sortable
                      orderBy="websiteName"
                      order={order}
                      onRequestSort={handleRequestSort}
                    />
                    <HeadCell label="URL" />
                    <HeadCell
                      label="Phase"
                      sortable
                      orderBy="phase"
                      order={order}
                      onRequestSort={handleRequestSort}
                    />
                    <HeadCell label="" />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getSortedRows().map((row) => (
                    <TableRow key={row.websiteId}>
                      <TableCell>{row.websiteName}</TableCell>
                      <TableCell>
                        <Link to={row.baseUrl} target="_blank">
                          <Typography variant="subtitle1" color="primary">
                            {row.baseUrl}&nbsp;
                            <OpenInNewIcon
                              sx={{ width: "20px", height: "20px" }}
                            />
                          </Typography>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <PhaseBadge
                          isCompleted={row.isCompleted}
                          isDarkPatternFree={row.isDarkPatternFree}
                        />
                      </TableCell>
                      <TableCell>
                        <Tooltip title="View Details" arrow>
                          <IconButton
                            onClick={() => navigate(`/client/website/${row.websiteId}`)}
                          >
                            <ViewIcon color="secondary" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Paper>


    </>
  );
};

export default WebsiteViewPage;
