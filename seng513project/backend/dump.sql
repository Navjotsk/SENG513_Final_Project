--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1
-- Dumped by pg_dump version 15.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: madlibs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.madlibs (
    type character varying NOT NULL,
    fill_word character varying[],
    id bigint NOT NULL,
    story_sentence character varying[]
);


--
-- Name: madlibs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.madlibs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: madlibs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.madlibs_id_seq OWNED BY public.madlibs.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    username character varying NOT NULL,
    password character varying NOT NULL,
    friends_list character varying[],
    email character varying,
    games_played bigint,
    high_score bigint,
    date_joined character varying
);


--
-- Name: madlibs id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.madlibs ALTER COLUMN id SET DEFAULT nextval('public.madlibs_id_seq'::regclass);


--
-- Data for Name: madlibs; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.madlibs (type, fill_word, id, story_sentence) FROM stdin;
tacos	{adjective,noun,noun,verb,noun,noun,noun,noun,phrase}	1	{"Today I went to my favorite Taco Stand called the",_,_,". Unlike most food stands",-,"they cook and prepare the food in a",_,"while you",_,". The best thing on the menu is the",_,". Instead of ground beef they fill the taco with",_,cheese,"and top it off with a salsa made from",_,". If that doesn't make your mouth water","then it' just like",_,"always says:",_}
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (username, password, friends_list, email, games_played, high_score, date_joined) FROM stdin;
tom\n	password123	{tom,john,dave}	\N	\N	\N	\N
john	password12	{tom}	\N	\N	\N	\N
dave	password1	{tom}	dave123@gmail.com	2	4133	07/12/2022
\.


--
-- Name: madlibs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.madlibs_id_seq', 6, true);


--
-- Name: madlibs madlibs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.madlibs
    ADD CONSTRAINT madlibs_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (username);


--
-- PostgreSQL database dump complete
--

