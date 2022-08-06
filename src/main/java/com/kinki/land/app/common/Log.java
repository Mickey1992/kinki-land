package com.kinki.land.app.common;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class Log {
    private static final Logger logger = LogManager.getLogger("log.kinki.land");

    public static void info(String messageFormat, Object... params) {
        logger.info(messageFormat, params);
    }

    public static void warn(String messageFormat, Object... params) {
        logger.warn(messageFormat, params);
    }

    public static void error(String message) {
        logger.error(message);
    }

    public static void error(Throwable throwable) {
        logger.error(throwable);
    }

    public static void error(Throwable throwable, String messageFormat, Object... params) {
        logger.error(String.format(messageFormat, params), throwable);
    }
}
