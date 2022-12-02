import { Container, Modal } from "react-bootstrap";

import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Table,
  Button,
} from "@mui/material";

import Swal from "sweetalert2";

import { getJobByID } from "api/Jobs";
import { UseLoadingHook } from "hooks";
import { useEffect, useState } from "react";
import { getRequest, postRequest } from "services/apiClient";
import { useParams } from "react-router";
const AppliedUsers = () => {
  const id = useParams();
  const { enableLoading, disableLoading } = UseLoadingHook();

  const [queries, setQueries] = useState([]);
  const handleQueries = async () => {
    const withJWT = true;
    console.log(id);
    enableLoading();
    try {
      // const {
      //   data: { questions },
      // } = await getRequest(getJobByID(jobId), withJWT);
      const {
        data: {
          job: { appliedUsers },
        },
      } = await getRequest(getJobByID(id.id), withJWT);
      console.log(appliedUsers);
      console.log(appliedUsers);
      setQueries(appliedUsers);
      disableLoading();
    } catch (e) {
      disableLoading();
    }
  };
  useEffect(() => {
    handleQueries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onStartedDownload = () => {
    console.log("Started downloading");
  };

  const onFailed = () => {
    console.log("Download failed");
  };
  const downloadResume = (id) => {
    console.log("s");

    var downloadUrl = "https://example.org/image.png";

    // eslint-disable-next-line no-undef
    var downloading = browser.downloads.download({
      url: downloadUrl,
      filename: id,
      conflictAction: "uniquify",
    });

    downloading.then(onStartedDownload, onFailed);
  };

  return (
    <>
      <Container fluid="md">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>First Name</TableCell>

              <TableCell>Last Name</TableCell>
              <TableCell>Resume</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {queries?.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>

                <TableCell>{item.email}</TableCell>

                <TableCell>{item.firstName}</TableCell>
                <TableCell>{item.lastName}</TableCell>

                <TableCell>
                  {item.resume === "" ? (
                    <TableCell>-</TableCell>
                  ) : (
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    <a
                      className="btn btn-danger"
                      role="button"
                      href={item.resume}
                      download="Resume"
                    >
                      Download
                    </a>
                    // <Button
                    //   type="submit"
                    //   variant="contained"
                    //   // onclick="window.open(`${item.resume}`)"
                    //   onClick={() => downloadResume(item.resume)}
                    // >
                    //   Download{" "}
                    // </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </>
  );
};

export default AppliedUsers;
