import { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {
  Paper,
  CardActionArea,
  CardMedia,
  Grid,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Button,
  CircularProgress,
} from "@material-ui/core";
import cblogo from "./cblogo.PNG";
import image from "./bg.png";
import { DropzoneArea } from "material-ui-dropzone";
import { common } from "@material-ui/core/colors";
import Clear from "@material-ui/icons/Clear";
import axios from "axios";

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(common.white),
    backgroundColor: common.white,
    "&:hover": {
      backgroundColor: "#ffffff7a",
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  grow: { flexGrow: 1 },

  mainContainer: {
    backgroundImage: `url(${image})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    minHeight: "100vh",
    paddingTop: 40,
    paddingBottom: 40,
  },

  imageCard: {
    margin: "auto",
    maxWidth: 500,
    width: "100%",
    padding: 20,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    boxShadow: "0px 15px 40px rgba(0,0,0,0.2)",
  },

  media: {
    height: 300,
    objectFit: "contain",
    borderRadius: 15,
  },

  detail: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "#f7f7f7",
    borderRadius: 15,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
  },

  tableContainer: {
    borderRadius: 10,
    overflow: "hidden",
  },

  tableHead: {
    backgroundColor: "#f0f0f0",
  },

  tableCell: {
    fontSize: 18,
    fontWeight: "bold",
  },

  clearButton: {
    marginTop: 10,
    borderRadius: 30,
    padding: "10px 25px",
    fontWeight: "bold",
  },

  appbar: {
    background: "#be6a77",
    boxShadow: "none",
    color: "white",
  },

  loader: {
    color: "#be6a77",
    marginBottom: 10,
  },
}));  
export const ImageUpload = () => {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [data, setData] = useState(null);
  const [imageSelected, setImageSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sendFile = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/predict",
        formData
      );

      setData(res.data);
    } catch (error) {
      console.error("API Error:", error);
      alert("Backend is not running or URL is wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const clearData = () => {
    setData(null);
    setImageSelected(false);
    setSelectedFile(null);
    setPreview(null);
  };

  useEffect(() => {
    if (!selectedFile) return;

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    setIsLoading(true);
    sendFile();
  }, [selectedFile]);

  const onSelectFile = (files) => {
    if (!files || files.length === 0) return;

    setSelectedFile(files[0]);
    setImageSelected(true);
    setData(null);
  };

  const confidence =
    data && data.confidence
      ? (parseFloat(data.confidence) * 100).toFixed(2)
      : 0;

  return (
    <>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <Typography variant="h6">
            CodeBasics: Potato Disease Classification
          </Typography>
          <div className={classes.grow} />
          <Avatar src={cblogo} />
        </Toolbar>
      </AppBar>

      <Container maxWidth={false} className={classes.mainContainer}>
        <Grid container justify="center" alignItems="center">
          <Grid item xs={12}>
            <Card
              className={`${classes.imageCard} ${
                !imageSelected ? classes.imageCardEmpty : ""
              }`}
            >
              {imageSelected && (
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={preview}
                    component="img" 
                  />
                </CardActionArea>
              )}

              {!imageSelected && (
                <CardContent>
                  <DropzoneArea
                    acceptedFiles={["image/*"]}
                    dropzoneText="Drag and drop an image of a potato leaf"
                    onChange={onSelectFile}
                  />
                </CardContent>
              )}

              {isLoading && (
                <CardContent className={classes.detail}>
                  <CircularProgress className={classes.loader} />
                  <Typography variant="h6">Processing</Typography>
                </CardContent>
              )}

              {data && (
                <CardContent className={classes.detail}>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Label</TableCell>
                          <TableCell align="right">Confidence</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>{data.class}</TableCell>
                          <TableCell align="right">
                            {confidence}%
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <ColorButton
                    variant="contained"
                    onClick={clearData}
                    startIcon={<Clear />}
                    style={{ marginTop: 20 }}
                  >
                    Clear
                  </ColorButton>
                </CardContent>
              )}
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};