import Jwt from "jsonwebtoken";

export const isUserAuthenticate = async (req, res, next) => {
    try {
        // Get token from cookies or headers
        const tokenFromCookies = req.cookies.token;
        const tokenFromHeaders = req.headers['authorization'] || req.headers['Authorization'];
        const token = tokenFromCookies || tokenFromHeaders;

        // Check if token is provided
        if (!token) {
            return res.status(200).json({
                
                message: "Please Login ...",
                error: true,
                success: false,
            });
        }

        // Verify the token
        Jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decode) => {
            if (err) {
                console.log(err, "Authentication error");
                return res.status(401).json({
                    error: true,
                    success: false,
                    message: "User is not authenticated"
                });
            }

            // Attach user ID to request object
            req.userID = decode._id;
            console.log("Decoded user ID:", req.userID);
            
            // Proceed to the next middleware
            next();
        });

    } catch (error) {
        console.error("Error in authentication middleware:", error);
        res.status(500).json({
            error: true,
            success: false,
            message: error
        });
    }
};
