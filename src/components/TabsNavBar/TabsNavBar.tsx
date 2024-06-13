  "use client";

  import React from "react";
  import Box from "@mui/material/Box";
  import Tab from "@mui/material/Tab";
  import TabContext from "@mui/lab/TabContext";
  import TabList from "@mui/lab/TabList";
  import TabPanel from "@mui/lab/TabPanel";
  import List from '@mui/material/List';
  import ListItem from '@mui/material/ListItem';
  import styles from "./TabsNavBar.module.css";
  import { useState } from "react";
  import { Link } from "@mui/material";

  export const TabsNavBar = () => {
    const [value, setValue] = useState(false);
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
      setValue(newValue);
    };
    return (
      <Box className={styles.TabsNavBarContainer}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              className={styles.TabList}
              aria-label="Tabs example"
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
              variant="scrollable"
              scrollButtons='auto'
            >
              <Tab label="Боты" value="1" disabled />
              <Tab label="Новости" value="2" disabled />
              <Tab label="Генеративные ИИ" value="3" />
              <Tab label="Сервисы" value="4" />
              <Tab label="Workflows" value="5" />
              <Tab label="Разговорный интерфейс" value="6" />
              <Tab label="Редактор диалогов" value="7" />
            </TabList>
          </Box>

          <TabPanel className={styles.TabPanel} value="1">
            <List className={styles.TabPaneList}>
              <ListItem>
                <Link className={styles.Link} href="#">Bot 1</Link>
              </ListItem>
              <ListItem>
                <Link className={styles.Link} href="#">Bot 2</Link>
              </ListItem>
              <ListItem>
                <Link className={styles.Link} href="#">Bot 3</Link>
              </ListItem>
            </List>
          </TabPanel>

          <TabPanel className={styles.TabPanel} value="2">
            <List className={styles.TabPaneList}>
              <ListItem>
                <Link className={styles.Link} href="#">New 1</Link>
              </ListItem>
              <ListItem>
                <Link className={styles.Link} href="#">New 2</Link>
              </ListItem>
              <ListItem>
                <Link className={styles.Link} href="#">New 3</Link>
              </ListItem>
            </List>
          </TabPanel>

          <TabPanel className={styles.TabPanel} value="3">
            <List className={styles.TabPaneList}>
              <ListItem>
                <Link className={styles.Link} href="#">Редактор промтов</Link>
              </ListItem>
            </List>
          </TabPanel>

          <TabPanel className={styles.TabPanel} value="4">
            <List>
              <ListItem className={styles.LinkItem}>
                <Link className={styles.Link} href="#">Регистрация web-сервиса</Link>
              </ListItem>
              <ListItem className={styles.LinkItem}>
                <Link className={styles.Link} href="#">Импорт web-сервиса</Link>
              </ListItem>
              <ListItem className={styles.LinkItem}>
                <Link className={styles.Link} href="#">Просмотр web-сервиса</Link>
              </ListItem>
              <ListItem className={styles.LinkItem}>
                <Link className={styles.Link} href="#">Компоненты и функции</Link>
              </ListItem>
            </List>
          </TabPanel>

          <TabPanel className={styles.TabPanel} value="5">
            <List className={styles.TabPaneList}>
              <ListItem>
                <Link className={styles.Link} href="#">Редактор потока работ для компонентов</Link>
              </ListItem>
            </List>
          </TabPanel>

          <TabPanel className={styles.TabPanel} value="6">
            <List className={styles.TabPaneList}>
              <ListItem>
                <Link className={styles.Link} href="#">Генератор спецификаций</Link>
              </ListItem>
            </List>
          </TabPanel>
          
          <TabPanel className={styles.TabPanel} value="7">
            <List>
              <ListItem>
                <Link className={styles.Link} href="#">Редактор анкеты</Link>
              </ListItem>
              <ListItem>
                <Link className={styles.Link} href="#">Генератор интерью</Link>
              </ListItem>
            </List>
          </TabPanel>

        </TabContext>
      </Box>
    );
  };
