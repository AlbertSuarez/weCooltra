/* USER */
CREATE TABLE wecooltra_user
(
  id integer NOT NULL,
  full_name character varying(100) NOT NULL,
  image_url character varying(500) NOT NULL,
  points integer NOT NULL,
  CONSTRAINT wecooltra_user_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE wecooltra_user
  OWNER TO postgres;

-- Column: wecooltra_user.balance
ALTER TABLE wecooltra_user ADD balance numeric default 0 NOT NULL;

/* TRIP */
CREATE TABLE wecooltra_trip
(
  id integer NOT NULL,
  start_point_lat numeric NOT NULL,
  start_point_lon numeric NOT NULL,
  end_point_lat numeric NOT NULL,
  end_point_lon numeric NOT NULL,
  started_at timestamp without time zone NOT NULL,
  ended_at timestamp without time zone NOT NULL,
  system_name character varying(100) NOT NULL,
  vehicle_external_id character varying(100) NOT NULL,
  duration_in_seconds numeric NOT NULL,
  billable_duration_in_seconds integer NOT NULL,
  first_checkout_attempt_at timestamp without time zone NOT NULL,
  first_checkout_attempt_error character varying(100),
  first_checkout_attempt_error_details character varying(100),
  first_checkout_attempt_id integer NOT NULL,
  first_checkout_attempt_state character varying(100) NOT NULL,
  last_checkout_attempt_at timestamp without time zone NOT NULL,
  last_checkout_attempt_error character varying(100),
  last_checkout_attempt_error_details character varying(100),
  last_checkout_attempt_id integer NOT NULL,
  last_checkout_attempt_state character varying(100) NOT NULL,
  first_odometer_in_meters integer NOT NULL,
  last_odometer_in_meters integer NOT NULL,
  pause_duration_in_seconds numeric NOT NULL,
  reservation_at timestamp without time zone NOT NULL,
  user_id integer NOT NULL,
  CONSTRAINT wecooltra_trip_pkey PRIMARY KEY (id),
  CONSTRAINT wecooltra_trip_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES wecooltra_user (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)
WITH (
  OIDS=FALSE
);
ALTER TABLE wecooltra_trip
  OWNER TO postgres;

/* ACHIEVEMENT */
CREATE SEQUENCE wecooltra_achievement_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE wecooltra_achievement_id_seq
    OWNER TO postgres;

CREATE TABLE wecooltra_achievement
(
  id integer NOT NULL DEFAULT nextval('wecooltra_achievement_id_seq'::regclass),
  title character varying(100) NOT NULL,
  description character varying(500) NOT NULL,
  points integer NOT NULL,
  CONSTRAINT wecooltra_achievement_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE wecooltra_achievement
  OWNER TO postgres;

/* ACHIEVEMENT - USER */
CREATE TABLE wecooltra_achievement_user
(
  achievement_id integer NOT NULL,
  user_id integer NOT NULL,
  CONSTRAINT wecooltra_achievement_user_pkey PRIMARY KEY (achievement_id, user_id),
  CONSTRAINT wecooltra_achievement_user_achievement_id_fkey FOREIGN KEY (achievement_id)
        REFERENCES wecooltra_achievement (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
  CONSTRAINT wecooltra_achievement_user_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES wecooltra_user (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)
WITH (
  OIDS=FALSE
);
ALTER TABLE wecooltra_achievement_user
  OWNER TO postgres;

/* FRIEND */
CREATE TABLE wecooltra_friend
(
  user_id_one integer NOT NULL,
  user_id_two integer NOT NULL,
  CONSTRAINT wecooltra_friend_pkey PRIMARY KEY (user_id_one, user_id_two),
  CONSTRAINT wecooltra_friend_user_id_one_fkey FOREIGN KEY (user_id_one)
        REFERENCES wecooltra_user (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
  CONSTRAINT wecooltra_friend_user_id_two_fkey FOREIGN KEY (user_id_two)
        REFERENCES wecooltra_user (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)
WITH (
  OIDS=FALSE
);
ALTER TABLE wecooltra_friend
  OWNER TO postgres;
