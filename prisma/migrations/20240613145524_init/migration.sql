-- CreateTable
CREATE TABLE "Account" (
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("provider","providerAccountId")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "password" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "answers" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "question_of_interview_id" TEXT NOT NULL,
    "answer_text" TEXT,
    "type" TEXT,

    CONSTRAINT "answers_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "compare_type" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "compare_type_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "condition_operand" (
    "id" TEXT NOT NULL,
    "condition_id" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,
    "compare_type_id" TEXT NOT NULL,
    "join_type" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "condition_operand_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conditions" (
    "id" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,
    "description" VARCHAR,

    CONSTRAINT "conditions_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "interview" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,

    CONSTRAINT "interview_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "interview_question_strategy" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "desciption" TEXT,

    CONSTRAINT "question_strategy_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "key_value_question_option_condition" (
    "id" TEXT NOT NULL,
    "condition_operand_id" TEXT NOT NULL,
    "option_of_question_id" TEXT NOT NULL,

    CONSTRAINT "key_value_condition_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "option_group" (
    "id" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "option_group_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "options" (
    "id" TEXT NOT NULL,
    "text" TEXT,
    "type" SMALLINT,
    "constraint" TEXT,

    CONSTRAINT "options_of_answer_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "options_of_answer" (
    "id" TEXT NOT NULL,
    "options_of_question_id" TEXT,
    "answers_id" TEXT,

    CONSTRAINT "oprions_of_answer_for_question_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "options_of_option_group" (
    "id" TEXT NOT NULL,
    "option_group_id" TEXT NOT NULL,
    "option__id" TEXT NOT NULL,

    CONSTRAINT "options_of_option_group_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "options_of_question" (
    "id" TEXT NOT NULL,
    "option_id" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,
    "description" VARCHAR,

    CONSTRAINT "options_of_question_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "physical_fitness" (
    "id_physical_fitness" TEXT NOT NULL,
    "hang" BIGINT,
    "lifting_the_torso" BIGINT,
    "press" BIGINT,
    "time_running_1000_meters" BIGINT,
    "push-ups" BIGINT,
    "jump_from_a_place" BIGINT,
    "id_users" TEXT,

    CONSTRAINT "physical_fitness_pk" PRIMARY KEY ("id_physical_fitness")
);

-- CreateTable
CREATE TABLE "question" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "type" BOOLEAN DEFAULT false,

    CONSTRAINT "question_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question_of_interview" (
    "id" TEXT NOT NULL,
    "interview_id" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,
    "priority" INTEGER,
    "transition_type" SMALLINT,
    "required" BOOLEAN NOT NULL DEFAULT false,
    "max_answers" INTEGER,
    "open_option_text" TEXT,
    "has_open_option" BOOLEAN DEFAULT false,
    "type" INTEGER,

    CONSTRAINT "question_of_interview_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question_text" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,

    CONSTRAINT "question_text_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "result_value_question_option_condition" (
    "id" TEXT NOT NULL,
    "condition_operand_id" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "result_value_question_option_condition_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "type_of_answers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "type_of_answers_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_data" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "age" INTEGER,
    "height" INTEGER,

    CONSTRAINT "health_characteristic_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_parameter" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "user_parameter_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_parameter_values" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "user_parameter_id" TEXT NOT NULL,
    "value" TEXT,

    CONSTRAINT "user_parameter_values_pk" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "type_of_answers_unique" ON "type_of_answers"("name");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_question_of_interview_fk" FOREIGN KEY ("question_of_interview_id") REFERENCES "question_of_interview"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_type_of_answers_fk" FOREIGN KEY ("type") REFERENCES "type_of_answers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_users_fk" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "condition_operand" ADD CONSTRAINT "condition_operand_fk" FOREIGN KEY ("condition_id") REFERENCES "conditions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "condition_operand" ADD CONSTRAINT "condition_operand_fk_compare_type" FOREIGN KEY ("compare_type_id") REFERENCES "compare_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "condition_operand" ADD CONSTRAINT "condition_operand_fk_q" FOREIGN KEY ("question_id") REFERENCES "question_of_interview"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conditions" ADD CONSTRAINT "conditions_fk" FOREIGN KEY ("question_id") REFERENCES "question_of_interview"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "key_value_question_option_condition" ADD CONSTRAINT "key_value_condition_fk" FOREIGN KEY ("condition_operand_id") REFERENCES "condition_operand"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "key_value_question_option_condition" ADD CONSTRAINT "key_value_question_option_condition_fk" FOREIGN KEY ("option_of_question_id") REFERENCES "options_of_question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "options_of_answer" ADD CONSTRAINT "options_of_answer_answers_fk" FOREIGN KEY ("answers_id") REFERENCES "answers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "options_of_answer" ADD CONSTRAINT "options_of_answer_options_of_question_fk" FOREIGN KEY ("options_of_question_id") REFERENCES "options_of_question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "options_of_option_group" ADD CONSTRAINT "options_of_option_group_fk_og" FOREIGN KEY ("option_group_id") REFERENCES "option_group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "options_of_option_group" ADD CONSTRAINT "options_of_option_group_fk_opt" FOREIGN KEY ("option__id") REFERENCES "options"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "options_of_question" ADD CONSTRAINT "options_of_question_fk_options" FOREIGN KEY ("option_id") REFERENCES "options"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "options_of_question" ADD CONSTRAINT "options_of_question_fk_question" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "physical_fitness" ADD CONSTRAINT "physical_fitness_users_fk" FOREIGN KEY ("id_users") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_of_interview" ADD CONSTRAINT "question_of_interview_fk_to_interview" FOREIGN KEY ("interview_id") REFERENCES "interview"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_of_interview" ADD CONSTRAINT "question_of_interview_fk_to_question" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_text" ADD CONSTRAINT "question_text_fk" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "result_value_question_option_condition" ADD CONSTRAINT "result_value_question_option_condition_fk" FOREIGN KEY ("condition_operand_id") REFERENCES "condition_operand"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_data" ADD CONSTRAINT "health_characteristic_fk" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_parameter_values" ADD CONSTRAINT "user_parameter_values_fk_iser" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_parameter_values" ADD CONSTRAINT "user_parameter_values_fk_parameter" FOREIGN KEY ("user_parameter_id") REFERENCES "user_parameter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
