PGDMP                         z         	   ProjectDB    15.1    15.1                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    32768 	   ProjectDB    DATABASE     m   CREATE DATABASE "ProjectDB" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C';
    DROP DATABASE "ProjectDB";
                postgres    false            �            1259    32769    friends    TABLE     Z   CREATE TABLE public.friends (
    userid bigint NOT NULL,
    friendid bigint NOT NULL
);
    DROP TABLE public.friends;
       public         heap    postgres    false            �            1259    32772    madlibs    TABLE     �   CREATE TABLE public.madlibs (
    type character varying,
    fill_word character varying[],
    id bigint NOT NULL,
    story_sentence character varying[]
);
    DROP TABLE public.madlibs;
       public         heap    postgres    false            �            1259    32777    madlibs_id_seq    SEQUENCE     w   CREATE SEQUENCE public.madlibs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.madlibs_id_seq;
       public          postgres    false    215                       0    0    madlibs_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.madlibs_id_seq OWNED BY public.madlibs.id;
          public          postgres    false    216            �            1259    32778    users    TABLE     �   CREATE TABLE public.users (
    id bigint NOT NULL,
    email character varying(200) NOT NULL,
    password character varying(200) NOT NULL,
    username character varying,
    gameplayed integer
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    32783    users_id_seq    SEQUENCE     u   CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    217                       0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    218            x           2604    32784 
   madlibs id    DEFAULT     h   ALTER TABLE ONLY public.madlibs ALTER COLUMN id SET DEFAULT nextval('public.madlibs_id_seq'::regclass);
 9   ALTER TABLE public.madlibs ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215            y           2604    32785    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217                      0    32769    friends 
   TABLE DATA           3   COPY public.friends (userid, friendid) FROM stdin;
    public          postgres    false    214   �                 0    32772    madlibs 
   TABLE DATA           F   COPY public.madlibs (type, fill_word, id, story_sentence) FROM stdin;
    public          postgres    false    215   �                 0    32778    users 
   TABLE DATA           J   COPY public.users (id, email, password, username, gameplayed) FROM stdin;
    public          postgres    false    217   �$                  0    0    madlibs_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.madlibs_id_seq', 1, false);
          public          postgres    false    216                       0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 6, true);
          public          postgres    false    218            {           2606    32787    madlibs madlibs_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.madlibs
    ADD CONSTRAINT madlibs_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.madlibs DROP CONSTRAINT madlibs_pkey;
       public            postgres    false    215            }           2606    32789    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    217                       2606    32791    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    217            �           2606    32802    friends friendid-user-fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.friends
    ADD CONSTRAINT "friendid-user-fk" FOREIGN KEY (friendid) REFERENCES public.users(id) ON DELETE CASCADE NOT VALID;
 D   ALTER TABLE ONLY public.friends DROP CONSTRAINT "friendid-user-fk";
       public          postgres    false    217    3455    214            �           2606    32797    friends userid-user-fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.friends
    ADD CONSTRAINT "userid-user-fk" FOREIGN KEY (userid) REFERENCES public.users(id) ON DELETE CASCADE NOT VALID;
 B   ALTER TABLE ONLY public.friends DROP CONSTRAINT "userid-user-fk";
       public          postgres    false    217    214    3455                  x�3�4�2�4�2�1z\\\ V         �  x��Y�n�=S_�������'�\Y�C�M�t�����vfz�=��J��H~�_����g�� 6���鮮z��U���!�4��uy��6�\=�Wa����s�7U�0G}�����)U�G?�>^|��_]|X݇�͍9�a2S0��l�C�~rr����И�v�k��:��V����2t~�L�dx�I\�*�:�:���ct��Nޕe~0Vv9��s�f��6�M-,4a�Wz7�Ƨ�G�ir�1akv�l����[�u�z��?�|�2u�\r��4���	�ou�5�vɚ�602�>�-�d��Ұ��x/�F\z�k;�(���ڼ�a�8����`�	;������g���{knm��r<N�\Y3v�v+��Jܐ�󱛣��X}曭s�⫵��a;b�ݙ�O�""$�_#�7j�.Lfc�^Ǌ]#�Zve^�A�����"�"@���P�C<񏗗�{�uò�nCHxM8t�������	��nWuː�a��8�1 f�v��XG��d�u8��������<���!�]v��b�
���ˈ;��<H�K��8msT8������02;7�y4�����W����.Ե���j�k�j�a�R���s���BDT�PV�j��p��bD�s74��_���I��F����O�����]h	�>��Ar��bG��,;fRm�$���d�z�5�Ë�����et�R��&��)��G������9� �E�]��L�eg�D��d[��&���s"V݈������䁦��*����
��6$�Ķ�[7r2c�&f�܆�)�x��{��Ki�h�&7��!_������g:�����.�{����n`��ؘoL�;Q�C�)�`��l�I^i�V�JS�>7�ނUЈ��~[��������0z������i|Cώ�-ܣ1{_���z_Vo;'��+�&i��/h/b(A�\��D�9���3#��a�X�?��a��(
��]8F|-�*����k?��}�`u?��܄i�J��&qfR�-�ה7emg�Α
Q77����;��A

���Ȁ�f�lW�.��nC�fl�#9��6�.;X�i�(19Cg����JY���9�Y��Pn�mƓ�V�<�-�76��</���'�[`�H�B�RؽKW����!0�L�QM|Z�^����g�꟟�����~��X�}��-�����p�0�2G~�>^����>ĈZ ��N�dC�Z1�H���ObʼH䀎�_̐?��rue���d=+�,���/S��P�y��i�((�*]2��J�! F�#^9b����ͺ�":[�C����[b����rB�a"HU��)�����A�T`���<�/�x��X~}&��>R��ov8����⒊am��
����F�p2��D��[_F�'�
���I=x���g���ܯYy�z����mz8�աĢ���;��������7eOT����̑��ɿ�+�|~�1(0�g����e;+���`"P�i�|F������D�=��Zӟ>X�Q�ݫx[if�<Z����w��l {�iR�*�&�+���͏!R����`k�x�\
�ن<AJe��w��[
Wfذ�e�i Y�zj��q�ʕ�k�*����R�A(/!H��"���}6�`�o�2Ivn\�}C=��8�֩I��DV�M��=��y��F�����E��ao����Z�	Eʰ���rk��]m-���Z�{����m8K�я�R�+�H�y��b�s�qF���O�R����TdoClV�Џ�(s�ލTȻ��އ��_o9Z���)�0,�Ƒn<��U�R������II���w�T��{��:ߝ�E(l~7�v]v|� �3Mݙv'��*�~��Ejl���u�Z�����6�u%s�(�/A�H:�6�L70���Ε�Y(�2�{�̥��b�r�43���Y,�a�$�_xr��5���{	] ��G��(=&o��0�>lp�^`��8[,�]%LH��'��H�Bp�Y(�Cm)�>�~m��h��t��l�a�`����K��b����������Q�0�3x_Q���Z��D��o�	b:�e��q��k㱓f�y��H�e�mc�=���S�	˦������ѢL�4 �D/j��<~�>���˞�P�m��.�TR�X��=�_1��ݺ?Q��о���NA��Hl����\8t�['�T�(�%�6Ԕ�6(/`����d��T�X�Y}F䭙:�B��>�v�'�"�\E��(��e/��ө2sBy���& ��t�p�Fvrʜ�Fd�J��/��_up6!��yΞ'�*�W�rR�0H��:�l��ju�B�Q���K�LY"�z�����h�&8��U��/5�uk�Y��h����9���Qkh���+�e��G�͋�ft}Cr��2��M�����K���C��PF�/��ݕ��ֹ�g�y:YUf�T�� ������~���f��INd���^/�OcyNQ�7X�2>	{��.�Pꤍ��;���RJQD-�5�\	'����%��[w�n��5�6���G������t��X�D�x¹:�ym�ɪ���ՠ�m���P�)����,]i��5Q��U��b]��Q���Tܵ6E��hh�l�n";�QdӰ��6N��Fs�f���m��^,�˦�C�Q9I��C�۠����V��]3�b�t�ɇ'�I^ļ���W��ښ"������exW}N�g�,�bbI2���
��_s�ڪ���|hwf���air�E�|��3CHNB�L�K��H0p[U>�uk� � ;A��L�Z��վ�K�4�f'0���T�tODQ,ڻ�`�bha"wYQz��0Γ�Q%�q�-�k�_u�nc٥���4
�V]�ā�PI�Δ���l�b,%�k����u�BÜ�`\�\&�gݠ9�t�yJ�F%�B��-)�;������2��� ���OD� ƾC��?��R`P��>\��s~BT`���b��H�!)&Be�)�+��^�$5�v�ҩ�.�#�-W%��9�k��Xd�V=5FG�ȮI4�2X���܄nlMs�����Q����g�ѝ�5ʶi�����R�[�2�9��[#�����������|,:��j�ںn�]����+����!�լ��h�O��~����ԋȼ.M�1�R;���S�un�%�'����"���hO�E�����.�a���6�6]���$�������_={���{6��         Q  x�e��o�0 �s�+v�\��ys��:P��⥺��QĢP��M�,1y���䗇 l�, 	�X~ ��$;䷥�7=��s��he�#�Aɥé~����N��+/����[[�zH���Or����P=��Kh��l~���v�cR��͖f��2o���V/�ݱe�Nu�@����fɊ�(�/��h9�o��p$<���mb�����Nӈ�,Ԍ&K4�:���h���]]�\�����RB�
�(<�(1l���}�2��؞#�>+}ҊI�G��]]�V�XᗩIQ��s+v���ǝ��,(�g=��V���<,�;vu�PӴ_>$�.     