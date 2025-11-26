import React, { useState } from "react";
import {
  Drawer,
  Paper,
  List,
  ListItem,
  ListItemText,
  Button,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ClearIcon from "@mui/icons-material/Clear";

import { useEventLog } from "../../hooks/useEventLog";

export const EventLog: React.FC = () => {
  const { events, clearEvents } = useEventLog();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <IconButton
        onClick={toggleDrawer}
        sx={{
          position: "fixed",
          top: 16,
          right: 16,
          backgroundColor: "#667eea",
          color: "white",
          "&:hover": {
            backgroundColor: "#764ba2",
          },
          zIndex: 1200,
        }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        anchor="right"
        open={isOpen}
        onClose={toggleDrawer}
        sx={{
          "& .MuiDrawer-paper": {
            width: 350,
            backgroundColor: "#1a1a2e",
          },
        }}
      >
        <Paper
          elevation={0}
          sx={{
            height: "100%",
            backgroundColor: "#1a1a2e",
            color: "white",
            padding: 2,
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h5" component="h2" sx={{ fontWeight: "bold" }}>
              Список событий
            </Typography>
            <Button
              variant="outlined"
              color="error"
              size="small"
              startIcon={<ClearIcon />}
              onClick={clearEvents}
              sx={{ textTransform: "none" }}
            >
              Очистить
            </Button>
          </Box>

          <List sx={{ overflowY: "auto", maxHeight: "calc(100vh - 120px)" }}>
            {events.length === 0 ? (
              <ListItem>
                <ListItemText
                  primary="Пока нет событий..."
                  sx={{ textAlign: "center", color: "#9ca3af" }}
                />
              </ListItem>
            ) : (
              events.map((event, index) => (
                <ListItem
                  key={index}
                  sx={{
                    backgroundColor: "#16213e",
                    marginBottom: 1,
                    borderRadius: 1,
                    border: "1px solid #0f3460",
                  }}
                >
                  <ListItemText
                    primary={event}
                    sx={{
                      "& .MuiListItemText-primary": {
                        fontSize: "0.875rem",
                        fontFamily: "monospace",
                      },
                    }}
                  />
                </ListItem>
              ))
            )}
          </List>
        </Paper>
      </Drawer>
    </>
  );
};
